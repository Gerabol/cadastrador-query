import SidebarMenu from './SidebarMenu.js';
import TopHeader from './TopHeader.js';
import PageFooter from './PageFooter.js';

export default {
  name: 'AppLayout',
  components: {
    SidebarMenu,
    TopHeader,
    PageFooter
  },
  props: {
    pageTitle: {
      type: String,
      default: 'Cadastrador Query'
    },
    userName: {
      type: String,
      default: 'User'
    },
    pageHeading: {
      type: String,
      default: 'Cadastrar Query'
    },
    addButtonText: {
      type: String,
      default: 'Query'
    },
    cardHeader: {
      type: String,
      default: 'Preencha os campos para incluir a query'
    },
    copyright: {
      type: String,
      default: 'Copyright © Cadastrador Query AGR'
    },
    buttonLink: {
      type: String,
      default: '#'
    }
  },
  template: `
    <div id="wrapper">
      <SidebarMenu :app-title="pageTitle" />

      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <TopHeader :user-name="userName" />

          <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">{{ pageHeading }}</h1>
              <a :href="buttonLink" class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
                <i class="fas fa-download fa-sm text-white-50"></i> + Add {{ addButtonText }}
              </a>
            </div>
            
            <slot></slot>
          </div>
        </div>

        <PageFooter :copyright="copyright" />
      </div>

      <!-- Logout Modal-->
      <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div class="modal-footer">
              <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a class="btn btn-primary" href="login.html">Logout</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll to Top Button-->
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
  `
};