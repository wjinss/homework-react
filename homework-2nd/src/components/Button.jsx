export default function Button({type, className, children, onClick, ariaLabel}) { 
  return <button type={type} className={className} aria-label={ariaLabel} onClick={onClick}>{children}</button>
}