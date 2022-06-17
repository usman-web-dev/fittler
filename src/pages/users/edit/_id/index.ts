import { Component, Vue } from 'nuxt-property-decorator';
import AddUser from '../../add';

@Component({
  components: {
    AddUser
  }
})
export default class EditUserByID extends Vue {}
