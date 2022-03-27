module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#2d4250",
        header: "#2d4250",
        grid: "#283d4a",
        button: "#14aff1",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '2': 'repeat(2, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '1': 'repeat(1, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};
