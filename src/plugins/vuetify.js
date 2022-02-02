import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      dark: {
        primary: colors.grey.lighten3,
        accent: colors.lightBlue.lighten1,
      },
    },
    dark: true,
  },
});
