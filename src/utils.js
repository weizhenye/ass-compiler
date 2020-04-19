export const assign = Object.assign || (
  /* istanbul ignore next */
  function assign(target, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      if (!sources[i]) continue;
      const keys = Object.keys(sources[i]);
      for (let j = 0; j < keys.length; j++) {
        // eslint-disable-next-line no-param-reassign
        target[keys[j]] = sources[i][keys[j]];
      }
    }
    return target;
  }
);

export const stylesFormat = ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding'];
export const eventsFormat = ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'];
