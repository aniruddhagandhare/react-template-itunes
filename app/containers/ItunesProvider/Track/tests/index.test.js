import React from 'react';
import { renderProvider } from '@app/utils/testUtils'
import { TrackTest as Track } from '../index'

describe('<Track /> container tests', () => {
    beforeEach(() => {
        submitSpy= jest.fn();
    })
    it("should render and match snapshot", () => {
        const { baseElement } = renderProvider(<Track />)
        expect(baseElement).toMatchSnapshot();
    })
})