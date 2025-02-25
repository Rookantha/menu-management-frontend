"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItem, updateItem, deleteItem } from "@/redux/features/menuSlice";

// Import icons from Heroicons
import { PlusCircleIcon, PencilIcon, CheckIcon, TrashIcon} from "@heroicons/react/24/solid";

interface MenuItem {
  id: number;
  name: string;
  parentId: number | null;
}

interface MenuTreeProps {
  menu: MenuItem;
  menus: MenuItem[];
}

export default function MenuTree({ menu, menus }: MenuTreeProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(menu.name);

  const childMenus = menus.filter((m) => m.parentId === menu.id);

  const handleAddChild = () => {
    dispatch(addItem({ name: "New Item", parentId: menu.id }));
  };

  const handleUpdate = () => {
    dispatch(updateItem({ id: menu.id, name: newName }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteItem(menu.id));
  };

  return (
    <li className="ml-6 my-2 transition-all duration-300 ease-in-out">
      <div className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-lg shadow-md transition-all">

        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-gray-400 p-1 rounded-md text-black dark:text-white bg-gray-50 dark:bg-gray-900 outline-none focus:ring focus:ring-blue-300"
          />
        ) : (
          <span className="font-semibold text-gray-800 dark:text-gray-200">{menu.name}</span>
        )}

        {/* Add Child Button */}
        <button
          onClick={handleAddChild}
          className="text-blue-500 hover:text-blue-700 transition-all"
          title="Add Submenu"
        >
          <PlusCircleIcon className="w-5 h-5" />
        </button>

        {/* Edit/Save Button */}
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="text-green-500 hover:text-green-700 transition-all"
            title="Save"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-500 hover:text-yellow-700 transition-all"
            title="Edit"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-all"
          title="Delete"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Render Child Menus */}
      {childMenus.length > 0 && (
        <ul className="ml-6 border-l border-gray-400 pl-3 space-y-2">
          {childMenus.map((childMenu) => (
            <MenuTree key={childMenu.id} menu={childMenu} menus={menus} />
          ))}
        </ul>
      )}
    </li>
  );
}
