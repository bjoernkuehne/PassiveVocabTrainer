import { ChangeEventHandler } from "react"

interface IProps {
    labelName: string
    componentName: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = (props: IProps): JSX.Element => {
    return (
        <>
            <label htmlFor={props.componentName}>{props.labelName}</label>
            <input
                name={props.componentName}
                id="setName"
                value={props.value}
                onChange={props.onChange}
            />
        </>
    )
}


export default Input