import { Dropdown, Space } from "antd";

const DropdownMenu = ({items}: {items: any}) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center ms-3 pl-5">
        <Dropdown arrow menu={{ items }}>
          <Space>
            <img
              className="w-10 h-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default DropdownMenu;
