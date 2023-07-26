import { takeEvery, put, all } from 'redux-saga/effects';
import { selectRoute } from './routesSlice';
import axios from 'axios';

// Функция для получения полилиний маршрута с API OSRM
function* fetchRoutePolyline(action) {
    try {
        const { route } = action.payload;
        const url = 'http://your-osrm-api-url'; // Замените на ваш URL OSRM API
        const response = yield axios.get(url, {
            params: {
                route: route.map((point) => point.join(',')),
            },
        });
        const polyline = response.data.polyline; // Предполагается, что API OSRM вернет полилинию в формате строки
        yield put(selectRoute(polyline));
    } catch (error) {
        console.error('Error fetching route polyline:', error);
        // Обработка ошибок HTTP-сервисов
        yield put(selectRoute(null));
    }
}

// Watcher saga
function* watchFetchRoutePolyline() {
    yield takeEvery('routes/selectRoute', fetchRoutePolyline);
}

export default function* rootSaga() {
    yield all([watchFetchRoutePolyline()]);
}
