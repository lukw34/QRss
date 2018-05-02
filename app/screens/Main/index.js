import {TabNavigator} from 'react-navigation';

import SessionWrapper from '../../components/SessionWrapper/index.android';
import variables from '../../variables';
import Dashboard from './Dashboard';
import Map from './Map/index.android';
import NewQRss from './NewQRss';
import Subscriptions from './Subscriptions';

const TabNavigatorComp = TabNavigator(
    {
        Dashboard: {screen: SessionWrapper(Dashboard)},
        NewQRss: {screen: SessionWrapper(NewQRss)},
        RSSMap: {screen: SessionWrapper(Map)},
        Boards: {screen: SessionWrapper(Subscriptions)}
    }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: {
                backgroundColor: variables.darkPrimary,
            },
            labelStyle: {
                fontSize: 11,
            },
            tintColor: variables.accentColor,
            indicatorStyle: {
                backgroundColor: variables.accentColor
            }
        }
    })
;
export default TabNavigatorComp;
