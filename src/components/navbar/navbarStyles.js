/** @format */

export const NavbarStyles = {
  width: "100vw",
  height: "10vh",
  display: "flex",
  borderBottom: "2px solid lightgray",
  ul: {
    display: "flex",
    width: "100%",
    listStyle: "none",
    flexDirection: "row",
    margin: "20px",
    li: {
      display: "flex",
      padding: "5px",
      margin: "0 20px",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      a: {
        textDecoration: "none",
        color: "black",
        cursor: "pointer",
        padding: "10px",
        ":hover": {
          borderBottom: "2px solid black",
        },
      },
    },
  },
  "@media screen and (max-width: 659px)": {
    height: "auto",
    display: "flex",
    justifyContent: "center",
    ul: {
      margin: "auto",
      li: {
        margin: "0",
      },
    },
  },
};
