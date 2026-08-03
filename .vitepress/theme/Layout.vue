<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import {
  VPBLayoutAuthorAsideBottom,
  VPBLayoutAuthorTop,
  VPBLayoutPostAsideBottom,
  VPBLayoutPostAsideTop,
  VPBLayoutPostBottom,
  VPBLayoutPostTop,
} from '@chunge16/vitepress-blogs-theme';
import CookieConsentButton from './CookieConsentButton.vue';

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
</script>

<template>
  <Layout>
    <!-- 博客文章/作者页插槽（原 VPBTheme 的 VPBLayout 逻辑） -->
    <template #doc-before>
      <VPBLayoutPostTop v-if="frontmatter.blog === 'post'" />
      <VPBLayoutAuthorTop v-if="frontmatter.blog === 'author'" />
    </template>
    <template #doc-footer-before>
      <VPBLayoutPostBottom v-if="frontmatter.blog === 'post'" />
    </template>
    <template #aside-top>
      <VPBLayoutPostAsideTop v-if="frontmatter.blog === 'post'" />
    </template>
    <template #aside-bottom>
      <VPBLayoutPostAsideBottom v-if="frontmatter.blog === 'post'" />
      <VPBLayoutAuthorAsideBottom v-if="frontmatter.blog === 'author'" />
    </template>
    <!-- 现有导航栏 Cookie 偏好设置按钮 -->
    <template #nav-bar-content-after>
      <CookieConsentButton />
    </template>
  </Layout>
</template>
