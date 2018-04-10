import {
  AlertPlugin,
  ToastPlugin,
  LoadingPlugin,
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
} from 'vux';

const options = {
  AlertPlugin,
  ToastPlugin,
  LoadingPlugin,
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
