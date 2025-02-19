"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus, addItem } from "@/redux/features/menuSlice";
import { RootState, AppDispatch } from "@/redux/store";
import MenuTree from "./components/MenuTree";


export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const menus = useSelector((state: RootState) => state.menu.items);
  const loading = useSelector((state: RootState) => state.menu.loading);

  const [newItem, setNewItem] = useState({ name: "", parentId: null });

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleAddRootItem = () => {
    if (newItem.name.trim()) {
      dispatch(addItem({ name: newItem.name, parentId: null }));
      setNewItem({ name: "", parentId: null });
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-4">Menus</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {menus
              .filter((menu) => menu.parentId === null) 
              .map((menu) => (
                <MenuTree key={menu.id} menu={menu} menus={menus} />
              ))}
          </ul>
        )}
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="w-full p-2 border rounded mt-2 text-black"
          placeholder="New Root Menu"
        />
        <button
          onClick={handleAddRootItem}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Root Menu
        </button>
      </aside>
    </div>
  );
}
