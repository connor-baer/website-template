import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { hideVisually } from 'polished';

import CONFIG from '../../config';
import Link from '../Link';
import Logo from './logo.svg';
import { fullWidthStyles } from '../../styles/shared';

const { site } = CONFIG;

const wrapperStyles = ({ theme }) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  ${theme.mq.kilo} {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const Wrapper = styled('div')(wrapperStyles, fullWidthStyles);

const logoStyles = ({ theme }) => css`
  fill: ${theme.colors.p500};
  width: 2.5rem;
  height: 2.5rem;
`;

const StyledLogo = styled(Logo)(logoStyles);

const SiteName = styled('span')`
  ${hideVisually()};
`;

const linkStyles = ({ theme }) => css`
  margin-left: 1rem;
  margin-right: -1rem;
  padding: 1rem;
  color: inherit;
  text-decoration: none;
  transition: color 0.1s ease-in-out, border 0.1s ease-in-out;

  &:hover,
  &:focus {
    color: ${theme.colors.p500};
    text-decoration: underline;
  }

  &:focus {
    outline: thin dotted currentColor;
    outline-offset: 0.25em;
  }

  &:active {
    color: ${theme.colors.p500};
  }

  ${theme.mq.kilo} {
    margin-left: 2rem;
  }

  ${theme.mq.mega} {
    margin-left: 3rem;
  }
`;

const A = styled('a')(linkStyles);

export default function Navigation({
  siteName = site.name,
  links = site.navLinks,
  ...rest
}) {
  return (
    <Wrapper>
      <Link href="/">
        <a title="Home">
          <StyledLogo aria-labelledby="site-name" />
          <SiteName id="site-name">{siteName}</SiteName>
        </a>
      </Link>

      <nav {...rest}>
        {links.map(({ label, ...link }) => (
          <Link key={link.href} {...link} passHref>
            <A>{label}</A>
          </Link>
        ))}
      </nav>
    </Wrapper>
  );
}
