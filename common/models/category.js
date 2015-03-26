module.exports = function(Category) {
  Category.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    console.log('req.body!!!', req.body);
    next();
  });
};