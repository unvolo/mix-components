import '../../src/m3/button/common-button.js';

const CompsView = {
  render: async () => {
    return `
      <h1>Components</h1>

      <div class="waterfall">
        <div class="waterfall-card">
          <div class="waterfall-card__title">
            <a router-link href="/demos/comps/dialog">Dialog</a>
          </div>
          <div class="waterfall-card__contents">
            <md-button>Button</md-button>
          </div>
        </div>
      </div>
    `;
  },
};

export default CompsView;
