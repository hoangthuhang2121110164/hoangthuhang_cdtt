const MainMenu = () => {
    return(
        <section class="hdl-mainmenu bg-main">
        <div class="container">
           <div class="row">
              <div class="col-12 d-none d-md-block col-md-2 d-none d-md-block">
                 <div class="dropdown list-category">
                    <strong class="dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">
                       Danh mục sản phẩm
                    </strong>
                    <ul class="dropdown-menu w-100">
                       <li><a class="dropdown-item" href="product_category.html">Thời trang nam</a></li>
                       <li><a class="dropdown-item" href="product_category.html">Thời trang nữ</a></li>
                       <li><a class="dropdown-item" href="product_category.html">Thời trang trẻ em</a></li>
                    </ul>
                 </div>
              </div>
              <div class="col-12 col-md-9">
                 <nav class="navbar navbar-expand-lg bg-main">
                    <div class="container-fluid">
                       <a class="navbar-brand d-block d-sm-none text-white" href="index.html">DIENLOISHOP</a>
                       <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                       </button>
                       <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                             <li class="nav-item">
                                <a class="nav-link text-white" aria-current="page" href="index.html">Trang chủ</a>
                             </li>
                             <li class="nav-item">
                                <a class="nav-link text-white" href="post_page.html">Giới thiệu</a>
                             </li>
                             <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                   Thời trang nam
                                </a>
                                <ul class="dropdown-menu">
                                   <li><a class="dropdown-item text-main" href="product_category.html">Quần jean nam</a>
                                   </li>
                                   <li><a class="dropdown-item text-main" href="product_category.html">Áo thun nam </a>
                                   </li>
                                   <li><a class="dropdown-item text-main" href="product_category.html">Sơ mi nam</a></li>
                                </ul>
                             </li>
                             <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                   Thời trang nữ
                                </a>
                                <ul class="dropdown-menu">
                                   <li><a class="dropdown-item text-main" href="product_category.html">Váy</a></li>
                                   <li><a class="dropdown-item text-main" href="product_category.html">Đầm</a>
                                   </li>
                                   <li><a class="dropdown-item text-main" href="product_category.html">Sơ mi nữ</a></li>
                                </ul>
                             </li>
                             <li class="nav-item">
                                <a href="post_topic.html" class="nav-link text-white">Bài viết</a>
                             </li>
                             <li class="nav-item">
                                <a href="contact.html" class="nav-link text-white">Liên hệ</a>
                             </li>
                          </ul>
                       </div>
                    </div>
                 </nav>
              </div>
           </div>
        </div>
     </section>
    );
}
export default MainMenu;