import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuService from "../../services/MenuService";

function MenuItem(props) {
    const rowmenu = props.menu;
    const [menus, setMenus] = useState([]);
    useEffect(function () {
      (async () => {
        const result = MenuService.getByParentId("mainmenu", 0);
        setMenus(result.menus);
      })();
    }, []);
      if (menus == null) {
        return (
            <li class="nav-item">
                <Link className="nav-link text-dark" to={rowmenu.link}>{rowmenu.name}</Link>
            </li>
        )
    }
    else {
        return (
            <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-dark"
              to={rowmenu.link}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {rowmenu.name}
            </Link>
            <ul className="dropdown-menu">
              {menus.map(function (menu1, index) {
                return (
                  <li key={index}>
                    <Link className="dropdown-item" to={menu1.link}>
                      {menu1.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        );
    
    }
}

export default MenuItem;