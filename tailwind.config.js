module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "system-ui"]
      },
      container: {
        center: true
      },
      colors: {
        primary: "#009bbe"
      },
      screens: {
        xs: { max: "639px" },
        lg: "992px"
      }
    },
    plugins: []
  }
};
