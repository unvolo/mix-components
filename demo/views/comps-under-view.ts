const CompsUnderView = {
  render: async () => {
    let parsed = {
      title: 'Comps ?',
    }
    return /* html */ `
      <h1>${parsed.title}</h1>

      <div role="region">
      </div>
    `
  },
}

export default CompsUnderView
