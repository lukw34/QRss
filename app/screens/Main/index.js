import {TabNavigator} from 'react-navigation';

import SessionWrapper from '../../components/SessionWrapper/index.android';
import variables from '../../variables';
import Dashboard from './Dashboard';
import Map from './Map/index.android';
import NewQRss from './NewQRss';

const TabNavigatorComp = TabNavigator(
    {
        NewQRss: {screen: NewQRss},
        Dashboard: {screen: Dashboard},
        RSSMap: {screen: Map}
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
