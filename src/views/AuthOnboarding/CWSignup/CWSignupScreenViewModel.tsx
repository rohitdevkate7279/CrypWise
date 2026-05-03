import { useState } from "react";
import { navigateTo, ActionType, NavigationStackData } from "../../../navigation/CWNavGraph";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppScreens } from "../../../navigation/CWNavigationConstants";

export default function CWSignupScreenViewModel(navigation: NativeStackNavigationProp<NavigationStackData>) {

    const nameRegex = /^[A-Za-z ]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));

        // clear error while typing
        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    };

    const validate = () => {
        let valid = true;
        let newErrors: any = {};

        if (!nameRegex.test(form.firstName.trim())) {
            newErrors.firstName = "Enter valid first name";
            valid = false;
        }

        if (!nameRegex.test(form.lastName.trim())) {
            newErrors.lastName = "Enter valid last name";
            valid = false;
        }

        if (!emailRegex.test(form.email.trim())) {
            newErrors.email = "Enter valid email";
            valid = false;
        }

        if (!mobileRegex.test(form.mobile.trim())) {
            newErrors.mobile = "Enter valid mobile number";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        setIsLoading(true)
        if (validate()) {

            navigateTo({
                actionType: ActionType.OPEN_NATIVE,
                destination: AppScreens.MPIN_SCREEN,
                params: {
                    formData: form
                }
            }, navigation)
            setIsLoading(false)
        }
    };
    return {
        handleSubmit,
        validate,
        nameRegex,
        emailRegex,
        mobileRegex,
        handleChange,
        form,
        setForm,
        errors,
        setErrors,
        isLoading
    }
}