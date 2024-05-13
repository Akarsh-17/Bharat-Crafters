import React from 'react'
import * as Icons from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { Link, matchPath, useLocation } from 'react-router-dom'
const SidebarLink = ({link,iconName}) => {

  const Icon=Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <Link
    to={link.path}
    className={`relative px-4 py-2 text-sm font-medium ${
      matchRoute(link.path)
        ? " text-orange-500"
        : "bg-opacity-0 text-richblack-300"
    } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-orange-500 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        <Icon  className="text-2xl"/>
        <span>{link.name}</span>
      </div>
    </Link>
  )
}

export default SidebarLink