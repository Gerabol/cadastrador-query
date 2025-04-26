// SidebarMenu.js
export default {
    name: 'SidebarMenu',
    props: {
      appTitle: {
        type: String,
        default: 'Cadastrador Query'
      }
    },
    template: `
      <ul class="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div class="sidebar-brand-icon">
            <img src="img/cadastrador.png" class="img-fluid" alt="...">
          </div>
          <div class="sidebar-brand-text">{{ appTitle }}</div>
        </a>
  
        <!-- Divider -->
        <hr class="sidebar-divider my-0">
  
        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
          <a class="nav-link" href="index.html">
            <i class="fas fa-tv"></i>
            <span>Gerencia do SIAF</span>
          </a>
        </li>
  
        <!-- Divider -->
        <hr class="sidebar-divider">
  
        <!-- Heading -->
        <div class="sidebar-heading">
          CADASTROS
        </div>
  
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
            aria-expanded="true" aria-controls="collapseTwo">
            <i class="fas fa-tasks"></i>
            <span>Query's</span>
          </a>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Cadastro:</h6>
              <a class="collapse-item" href="cadastrar_query.html">Query SQL</a>
            </div>
          </div>
        </li>
  
        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fas fa-users"></i>
            <span>Autores</span>
          </a>
          <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Cadastrar:</h6>
              <a class="collapse-item" href="cadastrar_autor.html">Autor</a>
            </div>
          </div>
        </li>
  
        <!-- Divider -->
        <hr class="sidebar-divider">
  
        <!-- Heading -->
        <div class="sidebar-heading">
          CONSULTAS
        </div>
  
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
            aria-expanded="true" aria-controls="collapsePages">
            <i class="fas fa-table"></i>
            <span>Tabelas</span>
          </a>
          <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Alteração:</h6>
              <a class="collapse-item" href="login.html">Logon</a>
              <a class="collapse-item" href="register.html">Resetar Senha</a>
              <div class="collapse-divider"></div>
              <a class="collapse-item" href="#">Query</a>
              <a class="collapse-item" href="#">Autores</a>
            </div>
          </div>
        </li>
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
    `
  };