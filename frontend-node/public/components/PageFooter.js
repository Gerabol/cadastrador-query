// PageFooter.js
export default {
    name: 'PageFooter',
    props: {
      copyright: {
        type: String,
        default: 'Copyright © Cadastrador Query CGE'
      }
    },
    template: `
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>{{ copyright }}</span>
          </div>
        </div>
      </footer>
    `
  };