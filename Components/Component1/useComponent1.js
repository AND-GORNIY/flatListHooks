import {useState, useCallback, useEffect} from 'react';
import {generateKey} from '../utils/generateKey';
export const useComponent1 = () => {
  const initialState = {
    data: [],
    textInput: '',
  };
  const [localState, setLocalState] = useState(initialState);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=15&inc=name')
      .then(res => res.json())
      .then(res => {
        makeArray(res);
      });
  }, []);

  const makeArray = useCallback(resultRequest => {
    const array = resultRequest.results.map(item => {
      return {
        name: item.name.first,
        key: generateKey(),
        isSelected: false,
      };
    });
    setLocalState({...localState, data: array});
  }, []);

  const setText = useCallback(
    textInput => {
      setLocalState({...localState, textInput});
    },
    [localState.data, localState.textInput],
  );

  const pressSave = useCallback(() => {
    let array = localState.data;
    let newObject = {
      name: localState.textInput,
      key: generateKey(),
      isSelected: false,
    };
    array.push(newObject);
    setLocalState({data: array, textInput: ''});
  }, [localState.textInput]);

  const pressEdit = useCallback(() => {
    let array = localState.data;
    let arrayChange = array.filter(item => {
      return item.isSelected === false;
    });
    setLocalState({...localState, data: arrayChange});
  }, [localState.data]);

  const disableEdit = useCallback(() => {
    const data = localState.data;
    console.log('data', data);
    if (data.length === 0) {
      return true;
    }
    let a = data.findIndex(item => {
      return item.isSelected === true;
    });
    return a === -1 ? true : false;
  }, [localState.data]);

  const handleSwitch = useCallback(
    key => {
      // console.log('key', key);
      return value => {
        let array = localState.data;
        let index = array.findIndex(item => {
          return item.key === key;
        });
        array[index].isSelected = value;
        setLocalState({...localState, data: array});
      };
    },
    [localState.data],
  );
  return {
    setText,
    pressEdit,
    pressSave,
    disableEdit,
    handleSwitch,
    localState,
  };
};
