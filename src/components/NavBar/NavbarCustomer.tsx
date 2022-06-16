import  Menu  from "antd/lib/menu";

const NavbarCustomer = () => {
  const items = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Category",
      key: "Category",
    },
    {
      label: "Order",
      key: "order",
    },
    {
      label: "Contact Us",
      key: "contactUs",
    }
  ];
  return (
    <>
      <Menu
        items={items}
        mode="horizontal"
        className="border-0"
      />
    </>
  );
};

export default NavbarCustomer;
