import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { BaseContext, GraphQLRequestContext } from 'apollo-server-types';

const logger = new Logger('Apollo Server');

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>
  ): Promise<void | GraphQLRequestListener<BaseContext>> {
    if (requestContext.request.operationName === 'IntrospectionQuery') {
      return;
    }
    logger.log(`🚀 ${requestContext.request.operationName}`);
    return;
  }
}
