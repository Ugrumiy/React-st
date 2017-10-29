import './index.scss';

const Radiobtn = props => (
  <label className="radiobtn">
    <input
      className="radiobtn__control required"
      type="radio"
      name={props.name}
      value={props.value}
      checked={props.checked}
      onClick={props.onChange}
    />
    <div className="radiobtn__mask" />
    <span className="radiobtn__title">{props.title}</span>
  </label>
);


export default Radiobtn;
