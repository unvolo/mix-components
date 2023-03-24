const LabUnderView = {
  render: async () => {
    let parsed = {
      title: 'Dialog',
    }
    return /* html */ `
      <h1>${parsed.title}</h1>

      <div role="region"></div>
    `
  },
}

export default LabUnderView
