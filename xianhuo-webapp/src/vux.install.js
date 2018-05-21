import {
  AlertPlugin,
  ToastPlugin,
  LoadingPlugin,
  ConfirmPlugin,
  Msg,
  Rater,
  Tabbar,
  Search,
  XCircle,
  Flexbox,
  Divider,
  TabbarItem,
  XInput,
  XButton,
  Selector,
  FlexboxItem,
  XTextarea,
  Group,
  XAddress,
  PopupPicker,
} from 'vux';

const options = {
  AlertPlugin,
  ToastPlugin,
  LoadingPlugin,
  ConfirmPlugin,
  Msg,
  Rater,
  Tabbar,
  Search,
  XCircle,
  Flexbox,
  Divider,
  TabbarItem,
  XInput,
  XButton,
  Selector,
  FlexboxItem,
  XTextarea,
  Group,
  XAddress,
  PopupPicker,
};
/* eslint-disable */
options.install = (Vue) => {
  for (let component in options) {
    const componentInstaller = options[component];

    if (componentInstaller && component !== 'install') {
      if (component.indexOf('Plugin') !== -1) {
        Vue.use(componentInstaller);
      } else {
        Vue.component(component, componentInstaller);
      }
    }
  }
};

export default options;
