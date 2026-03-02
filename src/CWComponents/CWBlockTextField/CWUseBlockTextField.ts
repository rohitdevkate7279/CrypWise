import { useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { CWBlockInputProps } from './CWBlockTextFieldTypes';

export const useBlockInput = ({
  onTextChange,
  onFilled,
  numberOfDigits = 6,
  disabled,
  autoFocus = true,
}: CWBlockInputProps) => {
  const [text, setText] = useState('');
  const [hasCursor, setHasCursor] = useState(autoFocus);
  const inputRef = useRef<TextInput>(null);
  const focusedInputIndex = text.length;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handlePress = () => {
    // To fix bug when keyboard is not popping up after being dismissed
    if (!Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    inputRef.current?.focus();
  };

  const handleTextChange = (value: string) => {    
    if (disabled) return;
    value = value?.replace(/[^0-9]/g, '');
    setText(value);
    onTextChange?.(value);
    if (value.length === numberOfDigits) {
      onFilled?.(value);
      setIsButtonEnabled(true);  // Enable button
    } else {
      setIsButtonEnabled(false); // Disable button if incomplete
    }
  
  };

  const setTextWithRef = (value: string) => {
    const normalizedValue = value.length > numberOfDigits ? value.slice(0, numberOfDigits) : value;
    handleTextChange(normalizedValue);
  };

  const clear = () => {
    setText('');
  };

  const focus = () => {
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setHasCursor(true);
  };

  const handleBlur = () => {
    setHasCursor(false);
  };

  return {
    models: { text, inputRef, focusedInputIndex, hasCursor },
    actions: { handlePress, handleTextChange, clear, focus, handleFocus, handleBlur },
    forms: { setText, setTextWithRef },
  };
};
