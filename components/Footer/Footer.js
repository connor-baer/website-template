import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import CONFIG from '../../config';
import Link from '../Link';
import { fullWidthStyles } from '../../styles/shared';

const { site } = CONFIG;

const YEAR = new Date().getFullYear();

const wrapperStyles = () => css`
  margin-top: 6rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const Wrapper = styled('footer')(fullWidthStyles, wrapperStyles);

const contentStyles = ({ theme }) => css`
  display: flex;
  flex-direction: column;
  border-top: 2px solid ${theme.colors.p500};
  padding: 5rem 0 2rem;

  ${theme.mq.mega} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Content = styled('div')(contentStyles);

const infoStyles = ({ theme }) => css`
  line-height: 1.75rem;

  ${theme.mq.mega} {
    order: 1;
  }
`;

const Info = styled('span')(infoStyles);

const linksStyles = ({ theme }) => css`
  margin: 0 0 2rem 0;
  padding: 0;

  ${theme.mq.mega} {
    margin-bottom: 0;
    order: 2;
  }
`;

const Links = styled('div')(linksStyles);

const linkStyles = ({ theme }) => css`
  display: inline-block;
  width: calc(50% + 0.5rem);
  margin-left: -0.5rem;
  padding: 0.5rem;
  color: inherit;
  transition: color 0.1s ease-in-out;

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
    width: auto;
    margin-right: 3rem;
    margin-left: -1rem;
    padding: 0 1rem;
  }

  ${theme.mq.mega} {
    margin-left: 3rem;
    margin-right: -1rem;
    padding: 0 1rem;
  }
`;

const A = styled('a')(linkStyles);

export default function Footer({
  siteName = site.name,
  siteAuthor = site.author,
  links = site.footerLinks
}) {
  return (
    <Wrapper>
      <Content>
        <Links>
          {links.map(({ label, ...link }) => (
            <Link key={link.href} {...link} passHref>
              <A>{label}</A>
            </Link>
          ))}
        </Links>
        <Info>
          All rights reserved – {siteAuthor || siteName} – {YEAR}
        </Info>
      </Content>
    </Wrapper>
  );
}
