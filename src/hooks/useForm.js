// import { View, Text } from 'react-native';
import React, { useEffect, useState , useCallback } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../CONfig/firebase';
// import { useCallback } from 'react';

// export const useAuth = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, user => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//     return unsub;
//   });
//   return user;
// };

export const  useForm =  (initialValues, validationRules = {})=> {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback(
    (fieldValues = values) => {
      const newErrors = {};
      Object.keys(validationRules).forEach(key => {
        const error = validationRules[key](fieldValues[key], fieldValues);
        if (error) newErrors[key] = error;
      });
      return newErrors;
    },
    [values],
  );

  const handleChange = useCallback(
    field => text => {
      const updated = { ...values, [field]: text };
      setValues(updated);
      if (touched[field] && validationRules[field]) {
        const err = validationRules[field](text, updated);
        setErrors(prev => ({ ...prev, [field]: err || '' }));
      }
    },
    [values, touched],
  );
  const handleBlur = useCallback(
    field => () => {
      setTouched(prev => ({ ...prev, [field]: true }));
      if (validationRules[field]) {
        const err = validationRules[field(values[field], values)];
        setErrors(prev => ({ ...prev, [field]: err || '' }));
      }
    },
    [values],
  );

  const handleSubmit = useCallback(
    onsubmit => () => {
      const touched = Object.keys(values).reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {},
      );
      setTouched(touched);
      const newErrors = validate();
      setErrors(newErrors);
      if (Object.values(newErrors).every(e => !e)) {
        onsubmit(values);
      }
    },
    [values, validate],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
