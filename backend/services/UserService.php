<?php

require_once "BaseService.php";
require_once(__DIR__ . '/../dao/UserDao.php');


class UserService extends BaseService
{

    public function __construct($dao)
    {
        return parent::__construct($dao);
    }


}
