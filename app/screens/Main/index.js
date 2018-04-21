import React from 'react';
import {TabNavigator} from 'react-navigation';

import SessionWrapper from '../../components/SessionWrapper/';
import variables from '../../variables';
import Dashboard from './Dashboard';
import Map from './Map';

const TabNavigatorComp = TabNavigator(
    {
        Dashboard: {screen: Dashboard},
        RSSMap: {screen: Map},
    }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: {
                backgroundColor: variables.darkPrimary,
            },
            labelStyle: {
                fontSize: 15,
            },
            tintColor: variables.accentColor,
            indicatorStyle: {
                backgroundColor: variables.accentColor
            }
        }
    })
;
export default SessionWrapper(TabNavigatorComp);
