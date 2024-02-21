import PropTypes from "prop-types";
import { forwardRef } from "react"
import styles from "./style.module.scss"


export const Input = forwardRef(({ label, error, ...rest }, ref) => {
  return (
    <>
      <label className={`${styles.label} headline}`}>
        {label}
        <input ref={ref} {...rest} />
        {error ? <span className="headlineBold">{error.message}</span> : null}
      </label>
    </>
  )
})

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};