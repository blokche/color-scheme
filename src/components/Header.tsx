import styled from 'styled-components';
import { Stack } from '@tymate/margaret';

const HeaderWrapper = styled(Stack)``;

export default function Header() {
    return (
        <header>
            <HeaderWrapper alignX="end">
                Margaret
            </HeaderWrapper>
        </header>
    )
}