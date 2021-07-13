/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#DF5E5E';
const text = '#212529';
const textLight = '#999';
const secondary = '#FDD2BF';
const success = '#28a745';
const error = '#dc3545';
const border = '#e8e8e8';
const shadow = 'rgba(0,0,0,0.04)';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  textLight,
  border,
  shadow,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
