/**
 *
 * Tests for ItunesHome
 *
 *
 */

 import React from 'react';
 import { renderProvider, timeout } from '@utils/testUtils';
 import { fireEvent } from '@testing-library/dom'
 import { ItunesHomeTest as ItunesHome } from '../index';
 
 describe('<ItunesHome /> container tests', () => {
   let submitSpy
 
   beforeEach(() => {
     submitSpy = jest.fn()
   });
   it('should render and match the snapshot', () => {
     const { baseElement } = renderProvider(<ItunesHome />);
     expect(baseElement).toMatchSnapshot();
   });

   it('should call dispatchGetSongs after input has changed', async () => {
       const requestGetSongs = jest.fn();
       const { getByTestId } = renderProvider(<ItunesHome dispatchGetSongs={requestGetSongs} />)
        fireEvent.change(getByTestId('search-term'), {
            target: { value: 'drake'}
        })
        await timeout(200);
        expect(requestGetSongs).toBeCalled();
   })

   it('should call dispatchClearSongs after the input is empty', async () => {
       const requestClearSongs = jest.fn();
       const requestGetSongs = jest.fn();
       const {getByTestId} = renderProvider(<ItunesHome dispatchGetSongs={requestGetSongs} dispatchClearSongs={requestClearSongs} />)
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
 