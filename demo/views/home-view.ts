const HomeView = {
  render: async () => {
    return /* html */ `
      <h1>Mix Components</h1>

      <p>This is home...</p>

      <a router-link href="/demos/comps">Components</a>
      <a router-link href="/demos/lab">Lab</a>
    `
  },
}

export default HomeView
