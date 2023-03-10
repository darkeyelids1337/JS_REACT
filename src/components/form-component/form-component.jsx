import React, {useState, useCallback} from 'react';
import './form-component.css';
import {Button, Form, Input} from 'antd';
const FormComponent = ({setForm, setFormData}) => {
    const [form] = Form.useForm();
    const [isError, setIsError] = useState(false);
    const [formData, setThisFormData] = useState({});
    const [isSubmit, setIsSubmit] = useState(true);
    const onFinish = useCallback(() => {
        if (Object.keys(formData).length < 4) {
            setIsError(true);
            return;
        }
        setIsError(false);
        const actors = formData.actors.split('; ').join(', ');
        setThisFormData((formData.actors = actors));
        setFormData(formData);
        setForm(!isSubmit);
    }, [formData, isSubmit, setForm, setFormData]);
    const onChange = e => {
        const value = e.target.value;
        const key = e.target.id;
        const updatedValue = {};
        updatedValue[key] = value;
        setThisFormData(formData => ({...formData, ...updatedValue}));
    };
    return (
        <div className="form-wrapper">
            <h1>Редактирование / Создание</h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label={<h2>Film Title</h2>}
                    required
                    tooltip="this is require field"
                    style={{fontSize: '20px'}}
                >
                    <Input
                        id="title"
                        placeholder="Enter film title"
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label={<h2>Year</h2>} required tooltip="this is require field" style={{fontSize: '20px'}}>
                    <Input
                        id="year"
                        placeholder="Enter year of film"
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label={<h2>Enter URL of poster</h2>} style={{fontSize: '20px'}}>
                    <Input
                        id="posterUrl"
                        placeholder="Enter..."
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label={<h2>Actors</h2>} required tooltip="this is require field" style={{fontSize: '20px'}}>
                    <Input
                        id="actors"
                        placeholder="Enter actors thorugh ;"
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item
                    label={<h2>Director</h2>}
                    required
                    tooltip="this is require field"
                    style={{fontSize: '20px'}}
                    onChange={onChange}
                >
                    <Input id="director" placeholder="Enter..." style={{width: '300px', backgroundColor: '#ecf1f7'}} />
                </Form.Item>
                <Button type="primary" htmlType="sumbit">
                    Save
                </Button>
            </Form>
            {isError ? <h2>Please enter the required fields!</h2> : null}
        </div>
    );
};

export default FormComponent;
