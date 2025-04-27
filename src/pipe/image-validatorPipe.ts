import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

const imageValidatorPipe = new ParseFilePipeBuilder()
  .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
  .addFileTypeValidator({
    fileType: /^image\/(png|jpg|jpeg|bmp|webp)$/,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });

export default imageValidatorPipe;
