/**
 *
 * Tests for ItunesHome
 *
 *
 */

 import React from 'react';
 import { renderProvider, timeout } from '@utils/testUtils';
 import { fireEvent } from '@testing-library/dom'
 import { DemoTest as Demo } from '../index';
 
 describe('<Demo /> container tests', () => {
   let submitSpy
 
   beforeEach(() => {
     submitSpy = jest.fn()
   });
   it('should render and match the snapshot', () => {
     const { baseElement } = renderProvider(<Demo />);
     expect(baseElement).toMatchSnapshot();
   });

   it('should call dispatchGetSongs after input has changed', async () => {
       const requestGetSongs = jest.fn();
       const { getByTestId } = renderProvider(<Demo dispatchGetSongs={requestGetSongs} />)
        fireEvent.change(getByTestId('search-term'), {
            target: { value: 'drake'}
        })
        await timeout(200);
        expect(requestGetSongs).toBeCalled();
   })

   it('should call dispatchClearSongs after the input is empty', async () => {
       const requestClearSongs = jest.fn();
       const requestGetSongs = jest.fn();
       const {getByTestId} = renderProvider(<Demo dispatchGetSongs={requestGetSongs} dispatchClearSongs={requestClearSongs} />)
       fireEvent.change(getByTestId('search-term'), {
           target: { value: 'drake' }
       })
       await timeout(200);
       expect(requestGetSongs).toBeCalled();
       fireEvent.change(getByTestId('search-term'), {
           target: {value: ''}
       })
       await timeout(200);
       expect(requestClearSongs).toBeCalled();
   })
 });
 