import * as React from 'react';
import Input from 'components/Input';
import Text from 'components/Text';
import { MinMaxFilterType } from 'types/filterTypes';
import Filter from '../Filter';


type MinMaxFilterProps = MinMaxFilterType & {
    minValue: number,
    onChangeMin: (value: string) => void,
    maxValue: number,
    onChangeMax: (value: string) => void,
}

const MinMaxFilter: React.FC<MinMaxFilterProps> = (props) => {

    const { 
        filterName, 
        filterSettings,
        minValue, onChangeMin,
        maxValue, onChangeMax,
    } = props;

    return (
        <Filter name={filterName}>
            <div className='filter-minmax'>
                <Input 
                    type='number'
                    value={minValue.toString()}
                    onChange={onChangeMin}
                />
                <Text weight='bold'>{' - '}</Text>
                <Input
                    type='number'
                    value={maxValue.toString()}
                    onChange={onChangeMax}
                />
                <Text color='secondary'>
                    {filterSettings.unit}
                </Text>
            </div>
        </Filter>
    )
}

export default MinMaxFilter;