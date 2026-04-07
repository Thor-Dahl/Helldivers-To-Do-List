import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

new SlimSelect({
  select: '#priority',
  settings: {
    showSearch: false,
    contentPosition: 'fixed',
  }
});