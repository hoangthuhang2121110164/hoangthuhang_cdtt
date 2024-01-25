import { Link } from "react-router-dom";
import MenuService from "../../services/MenuService";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

function Menu() {
  const [menus, setMenus] = useState([]);
  useEffect(function () {
    (async () => {
      const result = await MenuService.getByParentId("mainmenu", 0);
      setMenus(result.menus);
    })();
  }, []);

  return (
    <section className="bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link
              className="navbar-brand text-dark d-md-none d-sm-block"
              to="/"
            >
              Shop Rau Củ
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {menus.map(function (menu, index) {
                  return <MenuItem key={index} menu={menu} />;
                })}
                <li className="nav-item ">
                  <Link
                    className="nav-link active text-dark"
                    aria-current="page"
                    to="/lien-he"
                  >
                    Liên hệ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/san-pham">
                    Sản phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/bai-viet">
                    Bài viết
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
export default Menu;
