import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoute } from '../redux/routesSlice';
import { List } from 'antd';

const RouteList = () => {
    const dispatch = useDispatch();
    const routes = useSelector((state) => state.routes.routes);

    const handleRouteClick = (route) => {
        dispatch(selectRoute(route));
    };

    return (
        <div>
            <h2>Route List</h2>
            <List
                bordered
                dataSource={routes}
                renderItem={(route, index) => (
                    <List.Item onClick={() => handleRouteClick(route)}>Маршрутут {index + 1}</List.Item>
                )}
            />
        </div>
    );
};

export default RouteList;
