import React, {useState} from 'react';
import {PatternFormat} from 'react-number-format';
type Props = {
    name: string;
    onChange: (val: string) => void;
    field_value?: string;
};

const PhoneInput: React.FC<Props> = ({name, onChange, field_value}) => {
    const [focus, setFocus] = useState(false);
    const [format, setFormat] = useState('+7 (###) ###-##-##');
    const [value, setValue] = useState('');

    return (
        <PatternFormat
            onValueChange={values => {
                const val = values.floatValue;
                const valForSet = val ? '7' + val : '';
                onChange(valForSet);
            }}
            onKeyDown={(e: any) => {
                if (field_value === '78' && e.key === '9') {
                    setFormat('8 (###) ###-##-##');
                    setValue('9');
                    e.preventDefault();
                }
            }}
            name={name}
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            allowEmptyFormatting={focus}
            format={format}
            type={'tel'}
            mask="_"
            placeholder="Номер телефона"
            className="mb-[10px] py-[15px] px-[20px] w-full border border-[#C7DDF1] rounded-[5px] text-base outline-0 text_input"
        />
    );
};

PhoneInput.whyDidYouRender = true;
export default React.memo(PhoneInput);
