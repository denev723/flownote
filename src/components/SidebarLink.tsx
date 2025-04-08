import { NavLink } from "react-router-dom";

interface Props {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function SidebarLink({ href, title, description, icon }: Props) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => `
              w-full py-3 px-4 rounded-lg flex items-center gap-3
              bg-white shadow-sm hover:shadow-md ${
                isActive
                  ? "bg-blue-100 border-blue-300"
                  : "hover:bg-blue-50 border-transparent hover:border-blue-200"
              }
              active:bg-blue-100 transition-all duration-200
              relative overflow-hidden border group
            `}
    >
      {({ isActive }) => (
        <>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              isActive
                ? "bg-blue-200 text-blue-600"
                : "bg-blue-100 text-blue-500 group-hover:bg-blue-200"
            } transition-all`}
          >
            {icon && icon}
          </div>
          <div className="flex flex-col">
            <span
              className={`font-medium ${
                isActive ? "text-blue-700" : "text-gray-700 group-hover:text-blue-600"
              } transition-colors`}
            >
              {title}
            </span>
            <span
              className={`text-xs ${
                isActive ? "text-blue-500" : "text-gray-400 group-hover:text-blue-400"
              } transition-colors`}
            >
              {description}
            </span>
          </div>
        </>
      )}
    </NavLink>
  );
}
