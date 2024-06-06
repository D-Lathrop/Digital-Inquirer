'use strict';

//An escape function.
export function escapeHTML(input) {
    return input.replace(/[&<>"'/]/g, function (match) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      }[match];
    });
  }